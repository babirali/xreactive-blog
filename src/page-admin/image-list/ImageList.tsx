import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { spinnerService } from "../../service/spinner";
import axios from "axios";

const ImageList = () => {
    const [file, setFile] = useState(new File([""], ""));
    const [images, setImages] = useState([]);

    useEffect(() => {
        spinnerService.showLoading(true);
        axios.get(process.env.API_ENDPOINT + "api/upload/getall").then((response: any) => {
            setImages(response.data);
            console.log(response.data);
            spinnerService.showLoading(false);
        }).catch((error: any) => {
            // console.log(error);
            spinnerService.showLoading(false);
        });
    }, []);

    const uploadAction = (e) => {
        spinnerService.showLoading(true);
        const data = new FormData();
        data.append("image", file);
        axios.post(process.env.API_ENDPOINT + "api/upload", data).then((response: any) => {
            toast.success("Saved Successfully");
            spinnerService.showLoading(false);
        }).catch((error: any) => {
            toast.error("Error");
            // console.log(error);
        });
    };

    const deleteImage = (name) => {
        const data = {
            name
        };
        axios.post(process.env.API_ENDPOINT + "api/upload/delete", data).then((response: any) => {
            spinnerService.showLoading(false);
        }).catch((error: any) => {
            // console.log(error);
            spinnerService.showLoading(false);
        });
    };
    return (
        <div>
            <form id="upload-form" action="" encType="multipart/form-data">
                <h2>Select an image to upload:</h2>
                <div className="upload-container">
                    <input id="file-picker" type="file" name="image" onChange={(e) => setFile(e.target.files[0])} />
                </div>
                <div>
                    <input type="button" value="Upload Image" onClick={uploadAction} />
                </div>
            </form>
            {
                images.map((img, i) => {
                    return <img key={i} src={`https://xreactive.blob.core.windows.net/prod/` + img.name} onClick={() => deleteImage(img.name)} />;
                })
            }
        </div>
    );
};
export default ImageList;
