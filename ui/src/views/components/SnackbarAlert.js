import React from 'react'
import { Snackbar, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';

export default function SnackbarAlert(props) {

    var { message, open, onClose } = props

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            open={open}
            autoHideDuration={5000}
            onClose={onClose}
            message={message}
            action={
                <IconButton size="small" aria-label="close" color="inherit" onClick={onClose}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            }
        />
    )
}