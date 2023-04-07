const switching = (data) => {
    let lastUpdateString;
    let serviceTitle;

    if (data) {
        switch (data.lastUpdate) {
            case 1:
                lastUpdateString = 'under Review'
                break;
            case 2:
                lastUpdateString = 'under Technical study'
                break;
            case 3:
                lastUpdateString = 'payment'
                break;
            case 4:
                lastUpdateString = 'Under Processing'
                break;
            case 5:
                lastUpdateString = 'Done &closed'
                break;
            case 6:
                lastUpdateString = 'Absolutely rejected'
                break;

            default:
                lastUpdateString = 'No selected service'
                break;
        }

        switch (data.title) {
            case "0":
                serviceTitle = 'Installation new device'
                break;
            case "1":
                serviceTitle = 'Maintaing of exisisting Device'
                break;
            default:
                serviceTitle = 'No selected service'
                break;
        }
    }

    return { lastUpdateString, serviceTitle }


}

export default switching;