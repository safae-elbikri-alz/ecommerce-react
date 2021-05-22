import HelpIcon from '@material-ui/icons/Help';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import AssignmentReturnedIcon from '@material-ui/icons/AssignmentReturned';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

const orderStatuses = [
    {
        title: 'En attente',
        value: 0,
        icon: <AutorenewIcon 
            className={"spinning-icon"}
            style={{
                color: '#1BAAEF',
                
            }}
            fontSize="large"
        />
    },
    {
        title: 'Expédié',
        value: 1,
        icon: <LocalShippingIcon
            style={{
                color: '#1BDA51'
            }}
            fontSize="large"
        />
    },
]

const unconnu = {
    title: "Unconnu",
    icon: <HelpOutlineIcon
        style={{
            color: '#909090'
        }}
        fontSize="large"
    />
}

export const getOrderStatusTitle = (status) => {
    const temp = orderStatuses.filter(item => item.value === status);
    return temp && temp.length > 0 ? temp[0].title : unconnu.title;
}

export const getOrderStatusIcon = (status) => {
    const temp = orderStatuses.filter(item => item.value === status);
    return temp && temp.length > 0 ? temp[0].icon : unconnu.icon;
};