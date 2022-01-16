

export const utilSort = (data, isSort, dataSort) => {
    return data.sort((a, b) => {
        if(!isSort) {
            if(dataSort === 'createdAt') {
                return new Date(b[dataSort]) - new Date(a[dataSort])
            } else {
                return dataSort !== 'price' ? b[dataSort].localeCompare(a[dataSort]) : b[dataSort] - a[dataSort]
            }
           
        } else {
            if(dataSort === 'createdAt') {
                return new Date(a[dataSort]) - new Date(b[dataSort])
            } else {
                return dataSort !== 'price' ? a[dataSort].localeCompare(b[dataSort]) : a[dataSort] - b[dataSort]
            }
        }
    })
}