
package perobobbot.plugin.dashboard;

import jplugman.api.Requirement;
import perobobbot.data.service.BankService;
import perobobbot.data.service.BotService;
import perobobbot.data.service.OAuthService;
import perobobbot.lang.Instants;
import perobobbot.http.WebHookManager;
import perobobbot.chat.core.IO;
import perobobbot.lang.StandardInputProvider;
import perobobbot.lang.ApplicationCloser;
import perobobbot.lang.MessageDispatcher;
import perobobbot.messaging.ChatController;

public class Requirements {

        public static final Requirement<BotService> BOT_SERVICE = new Requirement<>(BotService.class,1);
        public static final Requirement<OAuthService> O_AUTH_SERVICE = new Requirement<>(OAuthService.class,1);
        public static final Requirement<Instants> INSTANTS = new Requirement<>(Instants.class,1);
        public static final Requirement<BankService> BANK = new Requirement<>(BankService.class,1);
        public static final Requirement<WebHookManager> WEB_HOOK_MANAGER = new Requirement<>(WebHookManager.class,1);
        public static final Requirement<IO> IO = new Requirement<>(IO.class,1);
        public static final Requirement<StandardInputProvider> STANDARD_INPUT_PROVIDER = new Requirement<>(StandardInputProvider.class,1);
        public static final Requirement<ApplicationCloser> APPLICATION_CLOSER = new Requirement<>(ApplicationCloser.class,1);
        public static final Requirement<MessageDispatcher> MESSAGE_DISPATCHER = new Requirement<>(MessageDispatcher.class,1);
        public static final Requirement<ChatController> CHAT_CONTROLLER = new Requirement<>(ChatController.class,1);

}
