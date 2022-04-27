import { Icon } from "semantic-ui-react"
import styles from "../../styles/loading/spinner.module.css"

const LoadingSpinner = () => {
    return (
        <div className={ styles.alignment }>
            <Icon 
                loading size='huge' 
                color='teal' 
                name='spinner'
            />
        </div>
    )
}

export default LoadingSpinner
