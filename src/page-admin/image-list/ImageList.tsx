import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { spinnerService } from "../../service/spinner";
import axios from "axios";
import "./ImageList.css";
import { CombineLatestSubscriber } from "rxjs/internal/observable/combineLatest";

const ImageList = () => {
    const [file, setFile] = useState(new File([""], ""));
    const [images, setImages] = useState([]);

    useEffect(() => {
        loadImages();
    }, []);

    const previewFile = (e) => {
        const preview = document.querySelector("#img");
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            // @ts-ignore
            preview.src = reader.result;
        };

        if (file) {
            reader.readAsDataURL(file);
        } else {
            // @ts-ignore
            preview.src = "";
        }
    };

    const loadImages = () => {
        spinnerService.showLoading(true);
        axios.get(process.env.API_ENDPOINT + "api/upload/getall").then((response: any) => {
            setImages(response.data);
            spinnerService.showLoading(false);
        }).catch((error: any) => {
            // console.log(error);
            spinnerService.showLoading(false);
        });
    };

    const uploadAction = (e) => {
        spinnerService.showLoading(true);
        const data = new FormData();
        data.append("image", file);
        axios.post(process.env.API_ENDPOINT + "api/upload", data).then((response: any) => {
            toast.success("Saved Successfully");
            loadImages();
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
            loadImages();
            spinnerService.showLoading(false);
        }).catch((error: any) => {
            // console.log(error);
            spinnerService.showLoading(false);
        });
    };
    const copyToClipboard = (url) => {
        // url = `https://xreactive.blob.core.windows.net/prod/` + url;
        const ele = document.getElementById(url);
        // @ts-ignore
        ele.select();
        document.execCommand("copy");
    };
    return (
        <div>
            <form id="upload-form" action="" encType="multipart/form-data">
                <h2>Select an image to upload:</h2>
                <div className="upload-container">
                    <input id="file-picker" type="file" name="image" onChange={(e) => { setFile(e.target.files[0]); previewFile(e); }} />
                    <img id="img" src="" style={{ width: "150px" }} />
                </div>
                <div>
                    <input type="button" value="Upload Image" onClick={uploadAction} />
                </div>
            </form>
            {
                images.map((img, i) => {
                    return (
                        <div className="image-p">
                            <img key={i} src={`https://xreactive.blob.core.windows.net/prod/` + img.name} onClick={() => deleteImage(img.name)} />
                            <div className="copy">
                                <input id={img.name} type="text" readOnly value={`https://xreactive.blob.core.windows.net/prod/` + img.name} />
                                {document.queryCommandSupported("copy") &&
                                    <button onClick={() => copyToClipboard(img.name)}>Copy URL</button>
                                }
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
};
export default ImageList;
