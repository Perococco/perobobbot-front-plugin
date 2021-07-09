
import jplugman.api.Plugin;
import perobobbot.plugin.dashboard.FrontEndPlugin;

module perobobbot.plugin.dashboard {
    requires static lombok;

    requires jplugman.api;
    requires com.google.common;

    requires perobobbot.lang;
    requires perobobbot.overlay.api;
    requires perobobbot.http;
    requires perobobbot.plugin;
    requires perobobbot.chat.core;
    requires perobobbot.sound;
    requires perobobbot.messaging;
    requires perobobbot.data.service;

    provides Plugin with FrontEndPlugin;
}
