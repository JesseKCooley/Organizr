//actually we shouldn't use this if at all possible, use index.css  instead 

const Container = {
     display: "flex", 
     flexDirection: "column", 
     justifyContent: "center"
     };
const Header = { padding: "10px 20px", textAlign: "center", color: "black" };
const LabelContainer = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  };
  const Label = { padding: "10px 20px", textAlign: "center" };
  const FormContainer = {
    display: "flex",
    flexDirection: "column", 
    justifyContent: "center",
    alignItems: "center",


  };
  const Input = {  
    top: "20px",
    right: "20px",
    background: "#f1f1f1",
    padding: "12px",
    margin: "24px",

    };


const TodoObject = {
        display: "flex",
        flexDirection: "row", 
        justifyContent : 'space-between',
        alignItems: "center",
        background: "#84cac2",
        margin: "22px",
        padding: "12px",
        
    }

  export const styles = {
    Container: Container,
    LabelContainer: LabelContainer,
    Label: Label,
    Header: Header,
    FormContainer: FormContainer,
    Input : Input,
    TodoObject:TodoObject
  }