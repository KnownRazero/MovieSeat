function Text ({count, total}) {
    return (
            <p className="text">
            You have selected <span>{count}</span> seats for a price of $
            <span>{total}</span>
            </p>
    )
}

export default Text;