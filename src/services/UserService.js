const signup = (name) => {
    const user = {name, coins: 100, moves: []}
    saveToLocal(user)

    return user
}

const loadUser = () => {
    return loadFromLocal()
}

const addMove = (toContact, amount) => {
    const user = loadFromLocal()
    user.moves.unshift({toId: toContact._id, to: toContact.name, amount, at: Date.now()})
    user.coins -= amount
    saveToLocal(user)
    return user
}

const saveToLocal = (user) => {
    localStorage.setItem('user', JSON.stringify(user))
}

const loadFromLocal = () => {
    const user = localStorage.getItem('user')
    if (!user) return null

    return JSON.parse(user)
}
export default {
    signup,
    loadUser,
    addMove
}