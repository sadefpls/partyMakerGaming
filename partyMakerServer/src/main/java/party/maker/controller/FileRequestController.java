package party.maker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import party.maker.abl.FileRequestAbl;
import party.maker.dto.ListFilesDtoIn;
import party.maker.dto.RenameFileDtoIn;
import party.maker.dto.pathDtoOut;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
public class FileRequestController {
    @Autowired
    private FileRequestAbl fileRequestAbl;

    @RequestMapping(value = "/files/list", method = POST)
    public pathDtoOut listFiles(@RequestBody(required = false) ListFilesDtoIn path) {
        return path != null ? fileRequestAbl.listFiles(path.getPath()) : fileRequestAbl.listFiles(null);
    }


    @RequestMapping(value = "/file/get", produces = "image/jpeg", method = POST)
    public @ResponseBody
    ResponseEntity<InputStreamResource> getFile(@RequestBody(required = false) ListFilesDtoIn dtoIn, HttpServletRequest request) throws IOException {
        return fileRequestAbl.getFile(dtoIn.getPath());
    }

    @RequestMapping(value = "file/rename", method = POST)
    public pathDtoOut renameFile(@RequestBody(required = false) RenameFileDtoIn dtoIn) {
        return fileRequestAbl.renameFile(dtoIn.getNewName(), dtoIn.getPath());
    }

    @RequestMapping(value = "file/delete", method = POST)
    public pathDtoOut deleteFile(@RequestBody(required = false) ListFilesDtoIn dtoIn) {
        return fileRequestAbl.deleteFile(dtoIn.getPath());
    }
}
