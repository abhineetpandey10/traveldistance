import '../css/button.css';

const Button=(props)=>{
    return(
        <div className="button">
            {props.value}
        </div>
    )
}

export default Button;