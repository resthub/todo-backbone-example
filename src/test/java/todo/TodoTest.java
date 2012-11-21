package todo;


import org.fest.assertions.api.Assertions;
import org.testng.annotations.Test;

/**
 * Tests for the Todo POJO.
 * @author Nicolas carlier <ncarlier@nunux.org>
 */
public class TodoTest {
    @Test
    public void testConstructors() {
        Todo t = new Todo();
        Assertions.assertThat(t.getDone()).isFalse();
        Assertions.assertThat(t.getOrder()).isEqualTo(0);
        Assertions.assertThat(t.getContent()).isNull();

        t = new Todo("test");
        Assertions.assertThat(t.getDone()).isFalse();
        Assertions.assertThat(t.getOrder()).isEqualTo(0);
        Assertions.assertThat(t.getContent()).isEqualTo("test");
    } 
}
