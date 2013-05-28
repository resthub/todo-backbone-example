package todo.integration;

import java.util.List;
import org.fest.assertions.api.Assertions;
import org.resthub.test.AbstractWebTest;
import org.resthub.web.Client;
import org.resthub.web.Http;
import org.resthub.web.Response;
import org.resthub.web.exception.NotFoundClientException;
import org.testng.annotations.Test;
import todo.Todo;

/**
 * Integration tests for the Todo controller
 */
public class TodoControllerIT extends AbstractWebTest {

    public TodoControllerIT() {
        // Call AbstractWebTest constructor with the Spring profiles to activate
        super("resthub-jpa,resthub-web-server");
    }

    @Test
    public void testCreateFindDeleteTodo() {
        Todo t = this.request("/api/todo").jsonPost(new Todo("this is a test")).resource(Todo.class);
        Assertions.assertThat(t).isNotNull();
        Assertions.assertThat(t.getId()).isNotNull();
        Long id = t.getId();

        List<Todo> todos = this.request("/api/todo/content/test").jsonGet().resource(List.class);
        Assertions.assertThat(todos).isNotEmpty();

        Response res = this.request("/api/todo/" + id).delete();
        Assertions.assertThat(res.getStatus()).isEqualTo(Http.NO_CONTENT);

        try {
            this.request("/api/todo/" + id).get();
            Assertions.fail("Must throw 404.");
        } catch (NotFoundClientException e) {}
    } 
}
