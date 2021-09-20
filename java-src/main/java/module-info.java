
import jplugman.api.Plugin;
import perobobbot.plugin.dashboard.JPlugin;

module perobobbot.plugin.dashboard {
    requires static lombok;

    requires jplugman.api;
    requires com.google.common;

    requires perobobbot.lang;
    requires perobobbot.http;
    requires perobobbot.plugin;
    requires perobobbot.chat.core;
    requires perobobbot.messaging;
    requires perobobbot.data.service;

    provides Plugin with JPlugin;
}
