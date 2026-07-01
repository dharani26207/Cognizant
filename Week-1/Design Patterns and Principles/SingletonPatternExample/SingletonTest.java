public class SingletonTest {

    public static void main(String[] args) {

        Logger logger1 = Logger.getInstance();
        logger1.log("Application Started");

        Logger logger2 = Logger.getInstance();
        logger2.log("Loading Data");

        Logger logger3 = Logger.getInstance();
        logger3.log("Application Closed");

        System.out.println();

        System.out.println(logger1.hashCode());
        System.out.println(logger2.hashCode());
        System.out.println(logger3.hashCode());

        if (logger1 == logger2) {
            System.out.println("Only one Logger object is created.");
        }
    }
}