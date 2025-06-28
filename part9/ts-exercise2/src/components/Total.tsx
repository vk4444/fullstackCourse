interface TotalProps {
    total: number
}

const Total = (props: TotalProps) => {

    return (
        <p>Total: {props.total}</p>
    )
}

export default Total