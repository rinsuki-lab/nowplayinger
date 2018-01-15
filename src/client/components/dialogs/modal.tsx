import * as React from "react"

export default class ModalDialog extends React.Component {
    render() {
        return <div style={{
            backgroundColor: "rgba(0,0,0,0.3)",
            position: "fixed",
            width: "100vw",
            height: "100vh",
            zIndex: 999999,
            top: "0",
            left: "0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <div style={{
                backgroundColor: "white",
                color: "black",
                padding: "1em"
            }}>
                {this.props.children}
            </div>
        </div>
    }
}