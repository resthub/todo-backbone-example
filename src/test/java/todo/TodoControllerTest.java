package todo;


import java.util.ArrayList;
import java.util.List;
import javax.inject.Inject;
import org.fest.assertions.api.Assertions;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.resthub.test.AbstractTest;
import org.springframework.test.context.ActiveProfiles;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

/**
 * Unit tests for the Todo Controller.
 * Perstence layer is mocked... because testing Spring Data is a bit useless.
 */
public class TodoControllerTest {

    @Mock
    TodoRepository todoRepository;

    @InjectMocks
    private TodoController controller;

    @BeforeTest
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testSearchByContent() {
        Todo todo = new Todo("test");
        List<Todo> todos = new ArrayList<>();
        todos.add(todo);
        Mockito.when(todoRepository.findByContentLike("%test%")).thenReturn(todos);
        List<Todo> result = controller.searchByContent("test");
        Assertions.assertThat(result).containsAll(todos);
    }
}
