import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '@material-ui/lab/Pagination';
import {  Box, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, makeStyles, TablePagination, Typography } from '@material-ui/core';
import clsx from 'clsx';
import CustomizedDialog from '../CustomizedDialog';
import VisibilityIcon from '@material-ui/icons/Visibility';
import GetAppIcon from '@material-ui/icons/GetApp';
import CommandeFacture from './CommandeFacture';
import { getOrderStatusIcon } from '../../utils/order-status';
import { getListCommandes } from '../../redux/commande/commandeActions';
import { StringUtils } from '../../utils/helper';
import moment from 'moment';
import axios from 'axios';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    dialogPaper: {
        width: '900px'
    },
    commandeItem: {
        height: '75px',
        "&:hover": {
            backgroundColor: "#FCFCFC",
            borderRadius: "10px",
            // cursor: "pointer",
            // transform: 'scale(1.01)'
        }
    },
    inline: {
        display: 'inline',
    },
    actions: {
        float: 'right',
    },
    pagination: {
        marginTop: "15px"
    },
    iconBtn: {
        margin: "0px 5px",
        padding: "5px",
        "&:hover": {
            borderRadius: '5px',
            backgroundColor: '#F4F4F4',
            cursor: 'pointer'
        }
    },
    viewBtn: {

    }, 
    downloadBtn: {

    }
}));

const ListCommandes = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const commandesList = useSelector(state => state.commande.list);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogContent, setDialogContent] = useState(null);
    const [pagination, setPagination] = useState({
        page: 0,
        size: 3
    })

    const voirPlus = (commande) => {
        const actions = [
            {
                name: "Imprimer",
                onClick: () => download(commande.id),
                color: "primary",
            },
            {
                name: "Fermer",
                onClick: handleCloseDialog,
                color: "default",
            }
        ]

        setDialogContent({
            title: 'Facture',
            content: <CommandeFacture commande={commande} />,
            actions: actions
        })
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setDialogContent(null);
        setOpenDialog(false);
    }

    const download = (id) => {
        const link = document.createElement('a');
        link.href = `${axios.defaults.baseURL}/facture/download/${id}?authorization=${axios.defaults.headers.common['Authorization']}`;
        link.click();
    }

    

    useEffect(() => {
        dispatch(getListCommandes());
    }, []);

    return (
        commandesList.length === 0
        ? <p>Votre historique de commande est vide.</p>
        : <div className="commandes-list">
            <List className={classes.root}>
                {
                    commandesList.slice(pagination.page * pagination.size, (pagination.page+1) * pagination.size).map(commande => (
                        <Box key={commande.id}>
                            <ListItem className={classes.commandeItem} alignItems="flex-start">
                                <ListItemAvatar>
                                    { getOrderStatusIcon(commande.status) }
                                </ListItemAvatar>
                                <Grid container alignItems="center">
                                    <ListItemText
                                        primary={`Total: ${commande.paiement.total} €`}
                                        secondary={
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                className={classes.inline}
                                                color="textPrimary"
                                                >
                                                {StringUtils.capitalizeEach(moment(commande.dateCreated).format("ddd Do MMMM YYYY"))}
                                            </Typography>
                                        }
                                    />
                                    <Grid
                                        item
                                        className={clsx(classes.actions, classes.inline)}
                                    >
                                        <VisibilityIcon 
                                            fontSize="small"
                                            className={clsx(classes.iconBtn, classes.viewBtn)}
                                            onClick={() => voirPlus(commande)}
                                        />
                                        <GetAppIcon 
                                            fontSize="small"
                                            className={clsx(classes.iconBtn, classes.downloadBtn)}
                                            onClick={() => download(commande.id)}
                                        />
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </Box>
                    ))
                }
            </List>
            <Pagination
                className={classes.pagination} 
                count={Math.ceil(commandesList.length/pagination.size)}
                page={pagination.page+1}
                onChange={(_, page) => setPagination({...pagination, page: page-1})}
            />
            
            <CustomizedDialog 
                open={openDialog}
                onClose={handleCloseDialog}
                paper={classes.dialogPaper}
                {...(dialogContent ? dialogContent : {})}
            />
        </div>
    );
};

export default ListCommandes;