import TodoContainer from "@/components/Todo/TodoContainer";
import Container from "@/components/ui/Container";


const Todo = () => {
    return (
        <Container>
            <h1 className="text-center my-10 font-serif text-3xl">Todo Pages</h1>
            <TodoContainer/>
            
        </Container>
    );
};

export default Todo;