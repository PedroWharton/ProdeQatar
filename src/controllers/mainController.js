

const mainController = {
    index: (req, res) => {
        res.render('./main/index', {name: 'styles', title: 'HOME'} );
    }
}

module.exports = mainController;