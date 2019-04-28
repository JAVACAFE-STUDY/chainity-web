import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import EasyCropper from './crop/easy/easy-crop';

const styles = {
    appBar: {
        position: 'relative'
    },
    flex: {
        flex: 1
    },
    imgContainer: {
        position: 'relative',
        flex: 1
    },
    img: {
        position: 'absolute',
        top: 20,
        bottom: 20,
        left: 20,
        right: 20,
        margin: 'auto',
        maxWidth: '100%',
        maxHeight: '100%'
    }
};

function Transition(props) {
    return <Slide direction="up" { ...props } />;
}

export interface IProfileDialogProp {
    classes: any;
    open: boolean;
    src: boolean;
    onClose: any;
    saveCroppedImg: any;
}

export interface IProfileDialogState {
    img: any;
}

class ProfileDialog extends React.Component<IProfileDialogProp, IProfileDialogState> {

    state: IProfileDialogState = {
        img: null
    };

    saveCroppedImg = croppedImg => {
        this.props.saveCroppedImg(croppedImg);
    };

    render() {
        const { classes } = this.props;
        return (
            <Dialog
                fullScreen
                open={ this.props.open }
                onClose={ this.props.onClose }
                TransitionComponent={ Transition }
            >
                <AppBar className={ classes.appBar }>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            onClick={ this.props.onClose }
                            aria-label="Close"
                        >
                            <CloseIcon/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <EasyCropper classes={ classes }
                             imageSrc={ this.props.src }
                             saveCroppedImg={ this.saveCroppedImg }/>
            </Dialog>
        );
    }
}

// @ts-ignore
export default withStyles(styles)(ProfileDialog);
