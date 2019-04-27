import './ReactCrop.css';

import React, { createRef } from 'react';
import { connect } from 'react-redux';
import { getSession } from 'app/shared/reducers/authentication';
import { createStyles, withStyles } from '@material-ui/core/styles';
import ReactCrop from 'react-image-crop';
import Button from '@material-ui/core/Button/Button';

const styles = theme =>
    createStyles({
        button: {
            borderRadius: '3px',
            fontSize: '14px',
            fontWeight: 400,
            padding: '6px 10px',
            backgroundColor: '#fff',
            borderColor: '#e5e5e5',
            color: '#2e2e2e',
            whiteSpace: 'nowrap'
        }
    });

export interface ICropProp extends StateProps, DispatchProps {
    classes: any;
    imageRef: any;
}

export interface ICropState {
    croppedImageUrl: any;
    src: any;
    crop: any;
}

export class Cropper extends React.Component<ICropProp, ICropState> {

    private imageRef: any;
    private readonly selectFileRef = createRef<HTMLInputElement>();

    state: ICropState = {
        croppedImageUrl: null,
        src: null,
        crop: {
            // aspect: 5 / 5,
            width: 200,
            height: 200,
            maxWidth: 200,
            maxHeight: 200,
            x: 0,
            y: 0
        }
    };

    componentDidMount() {
        // this.props.getSession();
    }

    onClick = () => {
        console.log('onClick');
        this.selectFileRef.current.click();
    };

    onSelectFile = e => {
        // TODO 최대파일 사이즈 체크
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () =>
                this.setState({ src: reader.result })
            );
            reader.readAsDataURL(e.target.files[ 0 ]);
        }
    };

    onImageLoaded = (image, crop) => {
        console.log('onImageLoaded');
        this.imageRef = image;
    };

    onCropComplete = crop => {
        console.log('onCropComplete');
        this.makeClientCrop(crop);
    };

    onCropChange = crop => {
        console.log('onCropChange');
        this.setState({ crop });
    };

    onDragStart = () => {
        console.log('onDragStart');
    };

    onDragEnd = () => {
        console.log('onDragEnd');
    };

    async makeClientCrop(crop) {
        console.log('makeClientCrop');
        console.log('makeClientCrop =======> ', crop.width, crop.height);
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
                this.imageRef,
                crop,
                'newFile.jpeg'
            );
            console.log('croppedImageUrl =======>', croppedImageUrl);
            this.setState({ croppedImageUrl });
        }
    }

    getCroppedImg = (image, crop, fileName) => {
        console.log('getCroppedImg');

        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;

        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        // 파일 전송하는 방법
        // return new Promise((resolve, reject) => {
        //     canvas.toBlob(blob => {
        //         if (!blob) {
        //             // reject(new Error('Canvas is empty'));
        //             console.error('Canvas is empty');
        //             return;
        //         }
        //         blob.name = fileName;
        //         // window.URL.revokeObjectURL(this.fileUrl);
        //         // this.fileUrl = window.URL.createObjectURL(blob);
        //         resolve(blob);
        //     }, 'image/jpeg');
        // });
    };

    render() {
        const { classes } = this.props;
        const { crop, croppedImageUrl, src } = this.state;
        console.log('render ==================>', crop, croppedImageUrl);
        return (
            <div>
                <div>
                    <input type="file" ref={ this.selectFileRef } onChange={ this.onSelectFile }
                           style={ { display: 'none' } }/>
                    <Button className={ classes.button } onClick={ this.onClick }>수정하기</Button>
                    <p>최대파일 사이즈는 200KB 입니다.</p>
                </div>
                { src && (
                    <div style={ { width: '200px', height: '200px' } }>
                        <ReactCrop
                            src={ src }
                            crop={ crop }
                            onImageLoaded={ this.onImageLoaded }
                            onComplete={ this.onCropComplete }
                            onChange={ this.onCropChange }
                            onDragStart={ this.onDragStart }
                            onDragEnd={ this.onDragEnd }
                        />
                    </div>
                ) }
                { croppedImageUrl && <img width="200" height="200" alt="Crop" src={ croppedImageUrl }/> }
            </div>
        );
    }
}

const mapStateToProps = storeState => ({
    account: storeState.authentication.account,
    isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = { getSession };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Cropper));
