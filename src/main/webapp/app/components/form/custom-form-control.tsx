import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import { createStyles, withStyles } from '@material-ui/core/styles';

const styles = theme =>
    createStyles({
        margin: {
            margin: theme.spacing.unit,
            width: '100%'
        },
        bootstrapRoot: {
            'label + &': {
                marginTop: theme.spacing.unit * 3
            }
        },
        bootstrapFormLabel: {
            fontSize: 18
        },
        bootstrapInput: {
            borderRadius: 4,
            position: 'relative',
            backgroundColor: theme.palette.common.white,
            border: '1px solid #ced4da',
            fontSize: 16,
            padding: '10px 12px',
            transition: theme.transitions.create([ 'border-color', 'box-shadow' ])
        }
    });

export interface IFormControlProp {
    classes?: any;
    title: string;
    type?: string;
    onChange: any;
    multiline?: boolean;
    rows?: string | number;
}

class CustomFormControl extends React.Component<IFormControlProp> {

    state = {
        value: ''
    };

    componentDidMount() {
    }

    onChange = e => {
        this.props.onChange(e.target.value);
        this.setState({ value: e.target.value });
    };

    render() {
        const { classes, title, type, multiline, rows } = this.props;
        const { value } = this.state;
        return (
            <div>
                <FormControl className={ classes.margin }>
                    <InputLabel shrink htmlFor="bootstrap-input" className={ classes.bootstrapFormLabel }>
                        { title }
                    </InputLabel>
                    <InputBase
                        id="bootstrap-input"
                        type={ type ? type : 'text' }
                        value={ value }
                        rows={ rows }
                        multiline={ multiline ? multiline : false }
                        onChange={ this.onChange }
                        classes={ {
                            root: classes.bootstrapRoot,
                            input: classes.bootstrapInput
                        } }
                    />
                </FormControl>
            </div>
        );
    }
}

export default withStyles(styles)(CustomFormControl);
