

function openOrder(req, res, next) {
    if (localStorage.getItem('ordernum')) {
        next({
            message: 'and order has already been created during this session'
        }
        )
    }
    return
}

module.exports = {
    openOrder
}