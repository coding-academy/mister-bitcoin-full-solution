
export default {
    signup,
    loadUser,
    addMove
}


function signup(name) {
    const user = {name, coins: 10000, moves: []}
    _saveToLocal(user)

    return user
}

function loadUser() {
    return _loadFromLocal()
}

function addMove(toContact, amount){
    const user = _loadFromLocal()
    user.moves.unshift({toId: toContact._id, to: toContact.name, amount, at: Date.now()})
    user.coins -= amount
    _saveToLocal(user)
    return user
}

function _saveToLocal(user){
    localStorage.setItem('user', JSON.stringify(user))
}

function _loadFromLocal() {
    const user = localStorage.getItem('user')
    if (!user) return null

    return JSON.parse(user)
}
