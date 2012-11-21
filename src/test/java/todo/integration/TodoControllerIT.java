package todo.integration;

import java.util.List;
import org.fest.assertions.api.Assertions;
import org.resthub.web.Client;
import org.resthub.web.Http;
import org.resthub.web.Response;
import org.resthub.web.exception.NotFoundClientException;
import org.testng.annotations.Test;
import todo.Todo;


/**
 * Integration tests for the Todod controller.
 */
public class TodoControllerIT {
    private static final int PORT = 8080;
    private static final String BASE_URL = "http://localhost:" + PORT;
    
    protected Client client;

    public TodoControllerIT() {
        this.client = new Client();
    }

    public Client.RequestHolder request(String urlSuffix) {
        return this.client.url(BASE_URL + "/api/" + urlSuffix);
    }

    @Test
    public void testCreateFindDeleteTodo() {
        Todo t = this.request("todo").jsonPost(new Todo("this is a test")).resource(Todo.class);
        Assertions.assertThat(t).isNotNull();
        Assertions.assertThat(t.getId()).isNotNull();
        String id = t.getId();

        List<Todo> todos = this.request("todo/content/test").getJson().resource(List.class);
        Assertions.assertThat(todos).isNotEmpty();

        Response res = this.request("todo/" + id).delete();
        Assertions.assertThat(res.getStatus()).isEqualTo(Http.NO_CONTENT);

        try {
            this.request("todo/" + id).get();
            Assertions.fail("Must throw 404.");
        } catch (NotFoundClientException e) {}
    } 
}
