package todo;

import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * A model class implemented as a POJO classes annotated by Spring Data annotations.
 */
@Document
public class Todo {

    @Id
    private String id;
    private String content;
    private Integer order;
    private Boolean done;

    public Todo() {
        done = false;
        order = 0;
    }

    public Todo(String content) {
        this.content = content;
        done = false;
        order = 0;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Boolean getDone() {
        return done;
    }

    public void setDone(Boolean done) {
        this.done = done;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getOrder() {
        return order;
    }

    public void setOrder(Integer order) {
        this.order = order;
    }

    @Override
    public String toString() {
        return "Todo{" + "id=" + id + ", content=" + content + ", order=" + order + ", done=" + done + '}';
    }
}
