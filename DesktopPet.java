import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class DesktopPet extends JFrame implements ActionListener {
    private JLabel label;
    private Timer timer;
    private int x, y;
    private JFrame frame;
    private int mouseX, mouseY;

    public DesktopPet() {
        super("Desktop Pet");
        frame = this;
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE); // close window
        setUndecorated(true); // remove title bar
        setBackground(new Color(0, 0, 0, 0)); // transparent background
        // setBounds(0, 0, 200, 200); // set size
        setAlwaysOnTop(true); // always on top
        setSize(200, 200);
        setResizable(true);
        setLayout(new BorderLayout());

        label = new JLabel(new ImageIcon("pet.png"));
        add(label, BorderLayout.CENTER);

        timer = new Timer(100, this);
        timer.start();

        addMouseListener(new MouseAdapter() {

            public void mouseEntered(MouseEvent e) {
                // when mouse enters, create new window,show a simple message in the new window

                JFrame newFrame = new JFrame("New Window");
                newFrame.setSize(300, 200);
                newFrame.setLocationRelativeTo(null);
                newFrame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
                // JOptionPane.showMessageDialog(newFrame, "This is a simple message.");
                newFrame.setVisible(true);
            }

            public void mouseClicked(MouseEvent e) {
                // left click=>print hello
                if (e.getButton() == MouseEvent.BUTTON1) {
                    System.out.println("hello");
                }
                // right click=>exit
                if (e.getButton() == MouseEvent.BUTTON3) {
                    System.exit(0);
                }
                // double click=>maximize/minimize

                // if (e.getClickCount() == 2) {
                // if (frame.getExtendedState() == JFrame.MAXIMIZED_BOTH) {
                // frame.setExtendedState(JFrame.NORMAL);
                // } else {
                // frame.setExtendedState(JFrame.MAXIMIZED_BOTH);
                // }
                // }
            }

            public void mousePressed(MouseEvent e) {
                // when mouse is pressed, store initial position
                mouseX = e.getX();
                mouseY = e.getY();
            }

            public void mouseReleased(MouseEvent e) {
                // when mouse is released, store final position
                mouseX = 0;
                mouseY = 0;
            }
        });

        addMouseMotionListener(new MouseAdapter() {
            public void mouseDragged(MouseEvent e) {
                int deltaX = e.getX() - mouseX;
                int deltaY = e.getY() - mouseY;
                setLocation(getX() + deltaX, getY() + deltaY);
            }
        });

        setVisible(true);
    }

    public void actionPerformed(ActionEvent e) {
        // TODO: move the label to a random location
    }

    public static void main(String[] args) {
        new DesktopPet();
    }
}