package todo;

import com.fasterxml.jackson.annotation.JsonView;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * A model class implemented as a POJO classes annotated by Spring Data annotations.
 */
@Entity
public class Todo {

    @Id @GeneratedValue
    private Long id;
    private String content;
    // We specify column name since order is a registered SQL keyword
    @Column(name = "ord")
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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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
