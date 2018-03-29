const data = [
    {
        id: 1,
        name: "zpc",
        time: new Date().getTime() - 5000,
        photo: require("../assets/logo.png")
    },
    {
        id: 2,
        name: "aaa",
        time: new Date().getTime(),
        photo: require("../assets/logo.png")
    },
    {
        id: 3,
        name: "bbb",
        time: new Date().getTime() + 864000,
        photo: require("../assets/logo.png")
    },
    {
        id: 4,
        name: "bbb",
        time: new Date().getTime() + 864000,
        photo: require("../assets/logo.png")
    },
    {
        id: 5,
        name: "bbb",
        time: new Date().getTime() + 864000,
        photo: require("../assets/logo.png")
    },
    {
        id: 6,
        name: "bbb",
        time: new Date().getTime() + 864000,
        photo: require("../assets/logo.png")
    },
    {
        id: 7,
        name: "bbb",
        time: new Date().getTime() + 864000,
        photo: require("../assets/logo.png")
    },
    {
        id: 8,
        name: "bbb",
        time: new Date().getTime() + 864000,
        photo: require("../assets/logo.png")
    }
]

export const getStateList = para => {
    return new Promise((resolve, reject) => {
        let res = {
            list: [],
            total: 0
        }
        let {page, pageSize} = para
        res.list = data.slice((page - 1) * pageSize, page * pageSize)
        res.total = data.length
        setTimeout(() => {
            resolve(res)
        }, 1000)
    }) 
}