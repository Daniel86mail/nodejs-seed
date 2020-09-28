const index = async (req, res) => {
    return res.render('index', {
        clientUrl: 'localhost:9000'
    });
};

module.exports = {
    index
};