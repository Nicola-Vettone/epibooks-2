import { Component } from "react";
import { ListGroup } from "react-bootstrap";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNWIxMWI3NDcwMTAwMTU4YjJhZjYiLCJpYXQiOjE3Mzg4NDc4NTUsImV4cCI6MTc0MDA1NzQ1NX0.V_6DbErWzNsVLJVY_Xf2RoSXFAmcnJYudANN116jOyI";

class CommentArea extends Component {
  state = {
    comments: "",
    rate: "",
    elementId: "",
  };

  fetchComments = async () => {
    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${this.state.elementId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Errore nel recupero dei commenti");
      }

      const data = await response.json();
      console.log(this.props.asin);

      this.setState({ comments: data });
    } catch (error) {
      console.error("Errore nel recupero dei commenti:", error);
    }
  };

  componentDidMount() {
    this.fetchComments();
  }

  render() {
    return (
      <ListGroup as="ul">
        {this.state.comments.length > 0 ? (
          this.state.comments.map((comment) => (
            <ListGroup.Item key={comment._id}>
              <strong>{comment.author}:</strong> {comment.comment} Rate: {comment.rate}/5
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item>Nessun commento disponibile</ListGroup.Item>
        )}
      </ListGroup>
    );
  }
}

export default CommentArea;
