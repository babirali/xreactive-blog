import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { spinnerService } from "../../service/spinner";
import axios from "axios";
import "./ImageList.css";
import { CombineLatestSubscriber } from "rxjs/internal/observable/combineLatest";

const ImageList = () => {
    const [file, setFile] = useState(new File([""], ""));
    const [images, setImages] = useState([]);
    const [disable, setDisable] = useState(true);

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
            cancel();
        }).catch((error: any) => {
            toast.error("Error");
            // console.log(error);
        });
    };

    const deleteImage = (name) => {
        const data = {
            name: name.replace("thumbnails", "")
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
        const ele = document.getElementById(url);
        // @ts-ignore
        ele.select();
        document.execCommand("copy");
    };
    const cancel = () => {
        setFile(new File([""], ""));
        const preview = document.querySelector("#img");
        // @ts-ignore
        preview.src = "";
        setDisable(true);
    };
    return (
        <div>
            <form id="upload-form" action="" encType="multipart/form-data">
                <h2>Images</h2>
                <input id="file-picker" type="file" name="image" onChange={(e) => { setFile(e.target.files[0]); previewFile(e); setDisable(false); }} />
                <img id="img" src="" style={{ width: "150px" }} />
                <button className="btn btn-primary" type="button" onClick={uploadAction} disabled={disable}>Upload Image</button>
                <button className="btn btn-primary" type="button" onClick={cancel}>Cancel</button>
            </form>
            {
                images.map((img, i) => {
                    return (
                        <div className="image-p m-1">
                            <img key={i} src={`https://xreactive.blob.core.windows.net/prod/` + img.name} />
                            <div className="hd">
                                <div className="copy-text">
                                    <input className="input-m" id={img.name} type="text" readOnly value={`https://xreactive.blob.core.windows.net/prod/` + img.name.replace("thumbnails", "images")} />
                                </div>
                                {
                                    document.queryCommandSupported("copy") &&
                                    <div className="copy pb-1 pt-1">
                                        <i className="fa fa-clipboard ci" aria-hidden="true" onClick={() => copyToClipboard(img.name)} />
                                        <i className="fa fa-trash ci-del" aria-hidden="true" onClick={() => deleteImage(img.name)} />
                                    </div>
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
