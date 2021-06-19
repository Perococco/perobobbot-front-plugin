
import jplugman.api.Plugin;
import perobobbot.plugin.MyPlugin;

module perobobbot.plugin {
    requires static lombok;

    requires jplugman.api;
    requires com.google.common;

    requires perobobbot.lang;
    requires perobobbot.overlay.api;
    requires perobobbot.http;
    requires perobobbot.chat.core;
    requires perobobbot.sound;
    requires perobobbot.messaging;
    requires perobobbot.data.service;

    provides Plugin with MyPlugin;
}
