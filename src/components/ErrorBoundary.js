import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
    static defaultProps = {
        message: 'An error occurred.'
    };

    static propTypes = {
        message: PropTypes.string
    };

    state = {
        hasError: false,
        error: null
    };

    componentDidCatch(error) {
        this.setState({
            hasError: true,
            error
        });
    }

    render() {
        const { hasError } = this.state;
        const { message } = this.props;
        if (hasError) {
            return (
                <div className="error">
                    { message }
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;