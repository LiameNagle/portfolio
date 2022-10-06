import javax.swing.*;
import javax.swing.border.Border;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
/*
in order to draw wordle i used java .awt and java swing
the frame class was used to seperate the two files to make work eaier however that hasnt gone as planned
most issues cased by these classes being separte
 */
public class myFrame extends JFrame {
    int temp =0;
  private JLabel[] lable;
  private JButton[] button;
    myFrame() {
        super();// pull methof
        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);// for close button
        this.setTitle("Wordle Demo");// title

        this.setSize(400, 600);


        lable = makeLable();
        JButton but[]= makeButtons(lable);
        this.setLayout(null);
        this.setVisible(true);
    }

    public JLabel[] getLable() {
        return lable;
    }

    public JButton[] getButton(){
        return button;
    }

    private JButton[] makeButtons(JLabel[]l){

        JButton b[] = new JButton[28];
        int by=370,bx=10,c=0;
        for(int i  =0; i<b.length;i++) {
            //makes alphabet adds to button text / instantiates it
            char x = (char) (97 + i);
            if(i<26) {
                b[i] = new JButton("" + x);
            }else if(i == 27){
                b[i] = new JButton("B");
            }else{
                b[i] = new JButton("E");
            }
            //sets action lister
            b[i].addActionListener(new NumberedActionListener(b,l,i));
            Border whitebrd = BorderFactory.createLineBorder(Color.lightGray, 2);
            b[i].setBorder(whitebrd);
            // sets color font and position of text
            b[i].setForeground(Color.WHITE);
            b[i].setFont(new Font("Aldertus",Font.BOLD,12));
            b[i].setHorizontalAlignment(JLabel.CENTER);
            b[i].setVerticalAlignment(JLabel.CENTER);

            // sets background ie square colour
            b[i].setBackground(new Color(0x3A3A3A));
            b[i].setOpaque(true);
            b[i].setFocusable(false);
            //places buttons
            b[i].setBounds(bx,by,20,40);
            this.add(b[i]);

            bx+=21;
            c++;
            if(c == 6){c=0;by+=41;bx=10;}
        }

        return b;
    }
    // is valid method will set upper and lower limts on count in numbered action listener


        private JLabel[] makeLable() {
        JLabel[] l = new JLabel[30];
        int lablex = 10;
        int labley = 10;
        int counter = 0;
        //int i = 0;
        for (int i = 0; i <l.length; i++) {
            // creates lable
            l[i] = new JLabel();

            //set bordeer
            Border whitebrd = BorderFactory.createLineBorder(Color.lightGray, 2);
            l[i].setBorder(whitebrd);

            // sets color font and position of text
            l[i].setForeground(Color.WHITE);
            l[i].setFont(new Font("Aldertus",Font.BOLD,30));
            l[i].setHorizontalAlignment(JLabel.CENTER);
            l[i].setVerticalAlignment(JLabel.CENTER);

            // sets background ie square colour
            l[i].setBackground(new Color(0x3A3A3A));
            l[i].setOpaque(true);

            // sets location and size
            l[i].setBounds(lablex, labley, 55, 55);

            // formats space of 5 between labes in a for of 5 * 6 hence counter
            lablex += 60;
            counter++;
            if (counter == 5) {
                counter = 0;
                labley += 60;
                lablex = 10;
            }
            // prints it on screen
            this.add(l[i]);
        }

        return l;
    }
}

