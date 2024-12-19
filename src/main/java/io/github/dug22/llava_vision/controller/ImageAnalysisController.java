package io.github.dug22.llava_vision.controller;

import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.ChatOptions;
import org.springframework.ai.chat.prompt.ChatOptionsBuilder;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.model.Media;
import org.springframework.ai.ollama.OllamaChatModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/image-analysis")
public class ImageAnalysisController {


    @Autowired
    private OllamaChatModel ollamaChatModel;

    @PostMapping
    public ResponseEntity<String> analyzeImage(@RequestParam("image") MultipartFile imageFile, @RequestParam("question") String question) throws IOException {
        ByteArrayResource imageResource = new ByteArrayResource(imageFile.getBytes());
        UserMessage userMessage = new UserMessage(question, new Media(MimeTypeUtils.IMAGE_PNG, imageResource));
        ChatResponse chatResponse = ollamaChatModel.call(new Prompt(userMessage, ChatOptionsBuilder.builder().withModel("llava").build()));
        return ResponseEntity.ok(chatResponse.getResult().getOutput().getContent());
    }
}
