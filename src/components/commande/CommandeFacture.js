import React from 'react';
import { Grid, List, ListItem, ListItemText, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import moment from 'moment';
import axios from 'axios';
import clsx from 'clsx';
import { getOrderStatusTitle } from '../../utils/order-status';
import { StringUtils } from '../../utils/helper';
import FactureLogo from '../../facture.png';

const useStyles = makeStyles((theme) => ({
    noMargin: {
        margin: 0
    },
    floatRight: {
        float: 'right'
    },
    textRight: {
        textAlign: 'right'
    },
    root: {
        padding: theme.spacing(0, 5)
    },
    logo: {
        maxWidth: '150px',
        maxHeight: '100px'
    },
    details: {
        padding: theme.spacing(0, 3)
    },
    heading: {
        display: 'flex',
        alignItems: "flex-end",
        justifyContent: 'space-between',
    },
    title: {
        display: 'inline-block',
        fontWeight: 'bold'
    },
    dense: {
        paddingTop: '0px',
        paddingBottom: '0px'
    },
    listItem: {
        alignItems: 'flex-start',
        padding: 0,
    },
    listItemText: {
        margin: '2px 0px'
    },
    label: {
        minWidth: '65px',
        fontWeight: '600',
        fontSize: '12px',
        margin: '3px 0px'
    },
    produits: {
        padding: theme.spacing(0, 3)
    },
    subTitle: {
        display: 'inline-block',
        fontWeight: 'bold',
        paddingBottom: theme.spacing(2)
    },
    imageProduit: {
        width: '60px',
        display: 'inline-block',
        marginRight: '10px'
    },
    nomProduit: {
        display: 'flex',
        alignItems: 'center'
    },
    footer: {
        padding: theme.spacing(0, 3),
        display: 'flex',
        flexDirection: 'row-reverse'
    },
    labelRowReverse: {
        width: '100px'
    }
}));

const CommandeFacture = ({commande}) => {
    const classes = useStyles();

    const listDetails = [
        {
            title: 'Numéro',
            primary: commande.id
        },
        {
            title: 'Statut',
            primary: getOrderStatusTitle(commande.status)
        },
        {
            title: 'À',
            primary: (
                <p className={classes.noMargin}>
                    {`${commande.firstname} ${commande.lastname.toUpperCase()}`}
                    <br/>
                    {commande.adresse}
                    <br/>
                    {
                        commande.suite && commande.suite.length !== 0 &&
                        <>
                            {commande.suite}
                            <br/>
                        </>
                    }
                    {commande.ville}, {commande.province}, {commande.zip}
                    <br/>
                    {commande.pays.nom}
                </p>
            )
        },
        {
            title: "Date",
            primary: StringUtils.capitalizeEach(moment(commande.dateCreated).format("ddd Do MMMM YYYY (L)"))
        },
    ]

    const listPayment = [
        {
            primary: `${Number(((commande.paiement.total - commande.shipping.prix).toFixed(2)))} €`
        },
        {
            title: commande.shipping.nom,
            primary: `${Number(((commande.shipping.prix).toFixed(2)))} €`
        },
        {
            title: 'Total',
            primary: `${Number(((commande.paiement.total).toFixed(2)))} €`
        },
    ]

    return (
        <Grid container className={classes.root}>
            <Grid item xs={12} className={classes.heading}>
                <Typography 
                    variant="body1"
                    className={classes.title}
                >
                    Détails de la commande :
                </Typography>
                <img 
                    className={clsx(classes.logo, classes.floatRight)}
                    // src="https://storage.googleapis.com/arabclicks-morexa.appspot.com/2020/06/adv_banggood_big.png"
                    src={FactureLogo}
                    alt="logo"
                />
            </Grid>
            <Grid item xs={12} className={classes.details}>
                <List 
                    dense={true}
                >
                    {
                        listDetails.map((item, idx) => (
                            <ListItem
                                className={classes.listItem}
                                classes={{
                                    dense: classes.dense
                                }}
                                key={idx}
                            >
                                <Typography 
                                    variant="body2"
                                    className={classes.label}
                                >
                                    {
                                        item.title &&
                                        `${item.title}:`
                                    }
                                </Typography>
                                <ListItemText
                                    classes={{
                                        root: classes.listItemText
                                    }}
                                    primary={item.primary}
                                    secondary={item.secondary && item.secondary}
                                />
                            </ListItem>
                        ))
                    }
                </List>
            </Grid>
            <Grid item xs={12} className={classes.produits}>
                <Typography 
                    variant="body2"
                    className={classes.subTitle}
                >
                    Listes des produits :
                </Typography>
                <TableContainer component={Paper}>
                    <Table aria-label="listes produits" size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell width={10}>ID</TableCell>
                                <TableCell>Produit</TableCell>
                                <TableCell width={10} align="right">Couleur</TableCell>
                                <TableCell width={10} align="right">Quantité</TableCell>
                                <TableCell width={10} align="right">Prix</TableCell>
                                <TableCell width={10} align="right">Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                commande.produits.map((item, idx) => (
                                    <TableRow key={idx}>
                                        <TableCell>{item.produit.id}</TableCell>
                                        <TableCell
                                            className={classes.nomProduit}
                                        >
                                            <img 
                                                className={classes.imageProduit}
                                                src={`${axios.defaults.baseURL}/files/produits/${item.produit.photo}`} 
                                                alt="produit" 
                                            />
                                            {item.produit.nom}
                                        </TableCell>
                                        <TableCell align="right">{item.idCouleur && item.produit.couleurs.filter(c => c.id === item.idCouleur)[0].nom}</TableCell>
                                        <TableCell align="right">{item.quantite}</TableCell>
                                        <TableCell align="right">{Number(item.produit.prixReel).toFixed(2)}</TableCell>
                                        <TableCell align="right">{Number(item.produit.prixReel * item.quantite).toFixed(2)}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={12} className={classes.footer}>
                <List 
                    dense={true}
                >
                    {
                        listPayment.map((item, idx) => (
                            <ListItem
                                className={classes.listItem}
                                classes={{
                                    dense: classes.dense
                                }}
                                key={idx}
                            >
                                <Typography 
                                    variant="body2"
                                    className={clsx(classes.label, classes.labelRowReverse)}
                                >
                                    {
                                        item.title &&
                                        `${item.title}:`
                                    }
                                </Typography>
                                <ListItemText
                                    classes={{
                                        root: clsx(classes.listItemText, classes.textRight)
                                    }}
                                    primary={item.primary}
                                    secondary={item.secondary && item.secondary}
                                />
                            </ListItem>
                        ))
                    }
                </List>
            </Grid>
        </Grid>
    );
};

export default CommandeFacture;