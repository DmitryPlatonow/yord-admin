import React from 'react'
import { Button } from "@material-ui/core";

export const LoadPictureModule = () => {
    const openWidget = () => {
        // create the widget
        const widget = window.cloudinary.createUploadWidget(
            {
                cloudName: 'da2aht0du',
                uploadPreset: 'vg7g3bdx',
            },
            (error, result) => {
                if (result.event === 'success') {
                    const copyText = result.info.secure_url;
                    navigator.clipboard.writeText(copyText);
                    widget.close();
                }
            },
        );
        widget.open();
    };
    return (
        <div style={{ position: 'fixed', bottom: '20px', left: '20px', zIndex: 3 }}>

            <Button style={{ position: 'fixed', bottom: '20px', left: '20px' }} variant="text" onClick={openWidget}>
                Upload Image
            </Button>
        </div>
    )
};
