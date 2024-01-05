const pagesController = module.exports;

pagesController.getHomePage = async (req, res) => {
    res.render('index', { title: 'Dashboard' });
}

pagesController.login = async (req, res) => {
    res.render('login', { title: 'Login' });
}

pagesController.user = async (req, res) => {
    res.render('app/user/index', { title: 'User' });
}

pagesController.request = async (req, res) => {
    res.render('app/user/request', { title: 'Request' });
}

pagesController.delivery = async (req, res) => {
    res.render('app/delivery', { title: 'Delivery' });
}

pagesController.deliverydashboard = async (req, res) => {
    res.render('app/delivery/dashboard', { title: 'Dashboard' });
}


