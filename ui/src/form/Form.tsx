import React from 'react';
import { Button, Container, Grid, IconButton, Typography, LinearProgress } from '@material-ui/core';
import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';
import queryString from 'query-string';
import { Field, FieldComponent, Fields } from './Field';
import { FormButton, FormButtons } from './FormButton';

const styles = (theme: Theme) => createStyles({
	root: {
		padding: 0
	},
	title: {
		marginBottom: theme.spacing(2)
	},
	status: {
		marginBottom: theme.spacing(1)
    },
    fieldRow: {
        marginBottom: theme.spacing(3)
    },
	buttons: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1)
    },
    button: {
        marginLeft: theme.spacing(1)
    }
});

export type FormProps<F extends Fields, B extends FormButtons<F>> = WithStyles<typeof styles> & {
    name?: string,
    documentation?: React.ComponentType,
    createFields: () => F,
    fieldLayout?: (keyof F)[]|(keyof F)[][],
    buttons: B,
    onLoad?: (fields: F, buttons: B) => Promise<void>,
    onLoadProgressMessage?: string
}

export type FormState<F extends Fields> = {
    status?: { message?: string, isError?: boolean },
    fields: F,
    progress?: { visible?: boolean, message?: string },
    onLoadExecuted?: boolean
}

class FormComponent<F extends Fields, B extends FormButtons<F>> extends React.Component<FormProps<F, B>, FormState<F>> {
    constructor(props: FormProps<F, B>, context?: any) {
        super(props, context);
        this.state = { fields: props.createFields() };
    }

    componentDidMount() {
        if (this.state.onLoadExecuted)
            return;

        this.onLoad();
    }

    private async onLoad() {
        this.setState({ progress: { visible: true, message: this.props.onLoadProgressMessage }});
        const newFields = this.props.createFields();
        try {
            for (const fieldPropertyName in newFields) {
                const field = newFields[fieldPropertyName].field;
                if (!field)
                    continue;

                if (field.onLoad)
                    await field.onLoad(newFields);

                if (!field.accessibility)
                    field.accessibility = {};
            }

            if (this.props.onLoad)
                await this.props.onLoad(newFields, this.props.buttons);
        } catch (error) {
            console.error(`Failed while running onLoad functions`, error);
        }

        this.setState({
            status: {},
            fields: newFields,
            progress: { visible: false },
            onLoadExecuted: true
        });
    }

    private async onChange(field: Field<any, any>, value: any, setFieldStatus: (message: string, isError: boolean) => void) {
        field.value = value;
        if (field.onChange) {
            try {
                await field.onChange(field.value, this.state.fields, setFieldStatus);
            } catch (error) {
                console.error(`Failed while running onChange for field: ${field.name}`, error);
            }
        }

        this.setState(this.state);
    }

    private async onClick(button: FormButton<any>) {
        if (button.onClick) {
            this.setState({ progress: { visible: true, message: button.progressMessage ? button.progressMessage(this.state.fields) : undefined }});
            try {
                const successMessage = await button.onClick(this.state.fields, this.props.buttons);
                if (successMessage)
                    this.setState({ status: { message: successMessage, isError: false}});
            } catch (error) {
                this.setState({ status: { message: error.message, isError: true}});
                console.error(`Error when clicking button: ${button.name}`, error);
            }
            this.setState({ progress: { visible: false }});
        }

        if (button.redirect) {
            let path = button.redirect.path;
            if (button.redirect.props)
                path += `?${queryString.stringify(button.redirect.props)}`;
            this.context.router.history.push(path);
            return;
        }

        if (button.clearFormOnClick)
            await this.onLoad();
    }

    render() {
        const { classes } = this.props;
        return (
            <Container className={classes.root} maxWidth={this.getContainerMaxWidth()}>
                <form autoComplete='off'>
                    <Grid container>
                        {this.Title(classes)}
                        {this.Documentation()}
                        {this.Status(classes)}
                        {this.Fields(classes)}
                        {this.Progress()}
                        {this.Buttons(classes)}
                    </Grid>
                </form>
            </Container>
        );
    }

    private getContainerMaxWidth(): 'xs'|'sm' {
        if (this.props.fieldLayout) {  // TODO validate that fields are not hidden
            if (this.props.fieldLayout.length < 2)
                return 'xs';

            for (const row of this.props.fieldLayout) {
                if ((row as string[]).length > 1)
                    return 'sm';
            }
        } else {
            const rows: boolean[] = [];
            for (const fieldPropertyName in this.state.fields) {
                const field = this.state.fields[fieldPropertyName].field;
                if (field.accessibility?.hidden)
                    continue;

                if (!field.layout)
                    continue;

                if (rows[field.layout.row])
                    return 'sm';

                rows[field.layout.row] = true;
            }
        }

        return 'xs';
    }

    private Title(classes: any) {
        if (!this.props.name)
            return null;

        return (
            <Grid container item xs={12} justify='flex-start' alignItems='flex-start' spacing={2}>
                <Grid item>
                    <Typography variant='h5' className={classes.title}>
                        {this.props.name}
                    </Typography>
                </Grid>
            </Grid>
        );
    }

    private Documentation() {
        if (!this.props.documentation)
            return null;

        return (
            <Grid container item xs={12} justify='flex-start' alignItems='flex-start'>
                <Grid item>
                    <this.props.documentation />
                </Grid>
            </Grid>
        );
    }
    
    private Status(classes: any) {
        if (!this.state.status || !this.state.status.message)
            return null;

        return (
            <Grid container item xs={12}>
                <Grid item xs={12} className={classes.status}>
                    <Typography
                        variant='subtitle1'
                        color={this.state.status.isError ? 'error' : 'primary'}
                    >
                        {this.state.status.message}
                    </Typography>
                </Grid>
            </Grid>
        );
    }
    
    private Fields(classes: any) {
        return (
            <Grid container item xs={12}>
                {
                    this.getFieldRows().map((fieldComponents, index) => {
                        if (!this.isFieldRowVisible(fieldComponents))
                            return null;
            
                        return (
                                <Grid
                                    container
                                    item
                                    className={classes.fieldRow}
                                    key={index}
                                >
                                    {
                                        fieldComponents.filter((fieldComponent) => {
                                            if (fieldComponent.field.accessibility?.hidden)
                                                return false;
                                    
                                            return true;
                                        }).map((fieldComponent) => (
                                            <Grid item xs={12} sm={fieldComponent.field.layout?.width as 1} key={fieldComponent.field.name}>
                                                <fieldComponent.component
                                                    field={fieldComponent.field}
                                                    onChange={this.onChange.bind(this)}
                                                />
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                        );
                    })
                }
            </Grid>
        );
    }
    
    private getFieldRows(): FieldComponent<any, any>[][] {
        const rows: FieldComponent<any, any>[][] = [];
        if (!this.state.fields)
            return rows;

        if (this.props.fieldLayout) {
            if (typeof this.props.fieldLayout[0] === 'string') {
                for (let i = 0; i < this.props.fieldLayout.length; i++) {
                    const fieldPropertyName = this.props.fieldLayout[i] as string;
                    const fieldComponent = this.state.fields[fieldPropertyName];
                    fieldComponent.field.layout = { row: i, width: 12 };
                    rows.push([fieldComponent]);
                }
            } else {
                for (let i = 0; i < this.props.fieldLayout.length; i++) {
                    const row = this.props.fieldLayout[i] as string[];
                    const columns = row.length;
                    if (columns > 6)
                        throw new Error(`When using FormProps.fieldLayout, the maximum number of fields per row is 6, provided: ${columns}. For more granular layout control use Field.layout`);

                    const currentRow: FieldComponent<any, any>[] = [];
                    for (const fieldPropertyName of row ) {
                        const fieldComponent = this.state.fields[fieldPropertyName];
                        fieldComponent.field.layout = { row: i, width: columns == 5 ? 2 : 12/columns as 1 };
                        currentRow.push(fieldComponent);
                    }
                    rows.push(currentRow);
                }
            }
        } else {
            for (const fieldPropertyName in this.state.fields) {
                const fieldComponent: FieldComponent<any, any> = this.state.fields[fieldPropertyName];
                const field = fieldComponent.field;
                if (!field.layout)
                    throw new Error(`Unless using FormProps.fieldLayout, Field.layout must be provided; layout not provided for field: ${field.name}`);
    
                if (typeof rows[field.layout.row] === 'undefined')
                    rows[field.layout.row] = [];
        
                if (field.layout.column && rows[field.layout.row].length >= field.layout.column) {
                    rows[field.layout.row].splice(field.layout.column - 1, 0, fieldComponent);
                } else
                    rows[field.layout.row].push(fieldComponent);
    
                const rowWidth = rows[field.layout.row].map((fieldComponent) => fieldComponent.field.layout?.width ? fieldComponent.field.layout.width as number : 0).reduce((accumulator, currentWidth) => accumulator + currentWidth);
                if (rowWidth > 12)
                    throw new Error(`Width of row exceeds maximum width (12), row width: ${rowWidth}, row index: ${field.layout.row}`);
            }
        }
    
        return rows;
    }
    
    private isFieldRowVisible(fieldComponents: FieldComponent<any, any>[]): boolean {
        for (const fieldComponent of fieldComponents) {
            if (!fieldComponent.field.accessibility || !fieldComponent.field.accessibility?.hidden)
                return true;
        }
    
        return false;
    }
    
    private Progress() {
        if (!this.state.progress || !this.state.progress.visible)
            return null;

        return (
            <Grid container item xs={12} justify='center' alignItems='center' spacing={2}>
                <Grid item>
                    <LinearProgress variant='indeterminate' color='primary' />
                </Grid>
            </Grid>
        );
    }
    
    private Buttons(classes: any) {
        return (
            <Grid 
                container
                item
                direction="row"
                justify="flex-end"
                alignItems="center"
                xs={12}
                className={classes.buttons}
            >
                {
                    Object.keys(this.props.buttons).map((buttonPropertyName) => this.props.buttons[buttonPropertyName]).filter((button) => {
                        if (button.accessibility?.hidden)
                            return false;
            
                        return true;
                    }).map((button, key) => {
                        return (
                            <Grid item key={key} className={classes.button}>
                                { button.style.icon ?
                                    <IconButton
                                        disabled={button.accessibility?.disabled}
                                        onClick={event => this.onClick(button)}
                                    >
                                        <button.style.icon />
                                    </IconButton>
                                    :
                                    <Button
                                        color={button.style.color}
                                        variant={button.style.border ? 'contained' : 'text'}
                                        disabled={button.accessibility?.disabled}
                                        onClick={event => this.onClick(button)}
                                    >
                                        {button.name}
                                    </Button>
                                }
                            </Grid>
                        )
                    })
                }
            </Grid>
        );
    }
}

type FormType = <F extends Fields, B extends FormButtons<F>>(props: Omit<FormProps<F, B>, 'classes'>) => JSX.Element;
export const Form = withStyles(styles)(FormComponent) as FormType;