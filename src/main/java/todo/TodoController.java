package todo;

import java.util.List;
import javax.inject.Inject;
import org.resthub.common.util.PostInitialize;
import org.resthub.web.controller.RepositoryBasedRestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * This Spring MVC controller extends RESThub REST controller for CRUD operations, and show how to extend it with your
 * application specific functionnalites.
 */
@Controller
@RequestMapping("/api/todo")
public class TodoController extends RepositoryBasedRestController<Todo, Long, TodoRepository> {

    protected Logger logger = LoggerFactory.getLogger(TodoController.class);

    @PostInitialize
    public void init() {
        this.repository.save(new Todo("test123"));
    }

    @Inject
    @Override
    public void setRepository(TodoRepository repository) {
        this.repository = repository;
    }

    @RequestMapping(value = "content/{content}", method = RequestMethod.GET)
    @ResponseBody
    public List<Todo> searchByContent(@PathVariable String content) {
        return this.repository.findByContentLike("%" + content + "%");
    }
}
