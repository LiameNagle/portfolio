import javax.swing.*;
import javax.swing.text.AttributeSet;
import javax.swing.text.SimpleAttributeSet;
import javax.swing.text.StyleConstants;
import javax.swing.text.StyleContext;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.Scanner;
import java.io.*;
import java.util.Random;

public class wrdl {

    public static void main(String[] args) {

        Dictionary fiveletterwords = new Dictionary();
        Random rnd = new Random();
        JFrame frame =new myFrame();
        Word guessofword = new Word(((myFrame) frame).getLable());
        int number =0;
        NumberedActionListener Nal = new NumberedActionListener(((myFrame) frame).getButton(), ((myFrame) frame).getLable(),number);// having never worked whit action listaner before i belive there is many mistakes
        String randomword = fiveletterwords.getWord(rnd.nextInt(fiveletterwords.getSize() + 1));// gets a random 5 letter word


        String[] flwArray = new String[fiveletterwords.getSize()];
        for (int i = 0; i < flwArray.length; i++) {
            flwArray[i] = fiveletterwords.getWord(i).substring(0, 5); //for some reson there is a sixth char i dont know where its comming from but substring fixed it
        }


        // set up for game
        //creating the pane
        String guess="bread";//applied in inner do while loop
        Nal.playGame(guess,flwArray,randomword);
    }
    public static int[] preCheck(String guess,String randomword,int[] count){
        for (int j = 0; j < guess.length(); j++) {
            if (guess.charAt(j) == randomword.charAt(j)) {
                count[j] = 0;
            }
        }return count;
    }
    public static void checkWord(ColorPane pane , String guess,String randomword){
        int[] count = new int[5];
        for(int i =0;i< count.length;i++){
            count[i]=1;
        }
        count = preCheck(guess,randomword,count);
        int greencount = 0;// is used to find 5 greens meaning the word is right
        for (int j = 0; j < guess.length(); j++) {//the loop for each character in my cuess compared to the answer
            if (guess.charAt(j) == randomword.charAt(j)) {//comparing the character at j in my guess  to the random word chosen
                pane.append(Color.GREEN, guess.charAt(j) + "");// prints the green character in GREEN  "" is used to turn the char to String for Syntax
                greencount++;// increase green count
            } else if(randomword.indexOf(guess.charAt(j)) != -1&&count[randomword.indexOf(guess.charAt(j))]!=0){// if the character at j is in the random word
                pane.append(Color.YELLOW, guess.charAt(j) + "");
            }else {
                pane.append(Color.BLACK,guess.charAt(j) + "");
            }

        }
        pane.append(Color.BLACK,"\n");
        if (greencount == 5) {
            pane.append(Color.MAGENTA, "\nyou win!");
        }
    }
}

class Dictionary {

    private String input[];

    public Dictionary() {
        input = load("C:\\sgb-words.txt");
    }

    public int getSize() {
        return input.length;
    }

    public String getWord(int n) {
        return input[n];
    }
    public void del(int n) {
        input[n] = "";
    }

    private String[] load(String file) {
        File aFile = new File(file);
        StringBuffer contents = new StringBuffer();
        BufferedReader input = null;
        try {
            input = new BufferedReader(new FileReader(aFile));
            String line = null;
            int i = 0;
            while ((line = input.readLine()) != null) {
                contents.append(line);
                i++;
                contents.append(System.getProperty("line.separator"));
            }
        } catch (FileNotFoundException ex) {
            System.out.println("Can't find the file - are you sure the file is in this location: " + file);
            ex.printStackTrace();
        } catch (IOException ex) {
            System.out.println("Input output exception while processing file");
            ex.printStackTrace();
        } finally {
            try {
                if (input != null) {
                    input.close();
                }
            } catch (IOException ex) {
                System.out.println("Input output exceptionimport java.io.*;\n" +
                        "\n" +
                        "public class Dictionary{\n" +
                        "     \n" +
                        "    private String input[]; \n" +
                        "\n" +
                        "    public Dictionary(){\n" +
                        "        input = load(\"C://words.txt\");  \n" +
                        "    }\n" +
                        "    \n" +
                        "    public int getSize(){\n" +
                        "        return input.length;\n" +
                        "    }\n" +
                        "    \n" +
                        "    public String getWord(int n){\n" +
                        "        return input[n];\n" +
                        "    }\n" +
                        "    \n" +
                        "    private String[] load(String file) {\n" +
                        "        File aFile = new File(file);     \n" +
                        "        StringBuffer contents = new StringBuffer();\n" +
                        "        BufferedReader input = null;\n" +
                        "        try {\n" +
                        "            input = new BufferedReader( new FileReader(aFile) );\n" +
                        "            String line = null; \n" +
                        "            int i = 0;\n" +
                        "            while (( line = input.readLine()) != null){\n" +
                        "                contents.append(line);\n" +
                        "                i++;\n" +
                        "                contents.append(System.getProperty(\"line.separator\"));\n" +
                        "            }\n" +
                        "        }catch (FileNotFoundException ex){\n" +
                        "            System.out.println(\"Can't find the file - are you sure the file is in this location: \"+file);\n" +
                        "            ex.printStackTrace();\n" +
                        "        }catch (IOException ex){\n" +
                        "            System.out.println(\"Input output exception while processing file\");\n" +
                        "            ex.printStackTrace();\n" +
                        "        }finally{\n" +
                        "            try {\n" +
                        "                if (input!= null) {\n" +
                        "                    input.close();\n" +
                        "                }\n" +
                        "            }catch (IOException ex){\n" +
                        "                System.out.println(\"Input output exception while processing file\");\n" +
                        "                ex.printStackTrace();\n" +
                        "            }\n" +
                        "        }\n" +
                        "        String[] array = contents.toString().split(\"\\n\");\n" +
                        "        for(String s: array){\n" +
                        "            s.trim();\n" +
                        "        }\n" +
                        "        return array;\n" +
                        "    }\n" +
                        "} while processing file");
                ex.printStackTrace();
            }
        }

        String[] array = contents.toString().split("\n");
        for (String s: array) {
            s.trim();
        }
        return array;
    }
}
class ColorPane extends JTextPane {
    public void append(Color c, String s) { // better implementation--uses
        // StyleContext
        StyleContext sc = StyleContext.getDefaultStyleContext();
        AttributeSet aset = sc.addAttribute(SimpleAttributeSet.EMPTY,
                StyleConstants.Foreground, c);

        int len = getDocument().getLength(); // same value as
        // getText().length();
        setCaretPosition(len); // place caret at the end (with no selection)
        setCharacterAttributes(aset, false);
        replaceSelection(s); // there is no selection, so inserts at caret
    }
}
class NumberedActionListener implements ActionListener {

    private int number;
    private int location;
    private JButton[] but;
    private JLabel[] lab;
    public static int enterpressed = 0;
    public static int count = 0;
    static int lower = 0;
    static int upper = 5;

    public NumberedActionListener(JButton[] b, JLabel[] l, int number) {
        this.number = number;
        //this.location = location;
        but = b;
        lab = l;
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        // remeber to set an upper limt and lower limit that can be increased by enter as long as word  is valid
        if (e.getSource() == but[number] && but[number].getText().equals("B") == false && but[number].getText().equals("E") == false) {
            if (count != upper) {
                lab[count].setText(but[number].getText());
                count++;
            }
        } else if (e.getSource() == but[number] && but[number].getText().equals("B") && but[number].getText().equals("E") == false) {
            if (count != lower)
                count--;
            lab[count].setText("");
        } else if (e.getSource() == but[number] && but[number].getText().equals("B") == false && but[number].getText().equals("E")) {
            if (count == upper) {
                enterpressed = 1;
            }
        }
    }

    public static int getCount() {
        return count;
    }

    public static void setLower(int x) {
        lower = x;
    }

    public static void setUpper(int x) {
        upper = x;
    }

    public static int getLower() {
        return lower;
    }

    public static int getUpper() {
        return upper;
    }

    public static void setEnterpressed(int n) {
        enterpressed = n;
    }

    public static int getEnterpressed() {
        return enterpressed;
    }

    public void playGame(String guess,String[] flwArray,String rndword) {
        boolean valid = false;
        int guessesLeft = 6;
        do {

            do { // starts validation
                Scanner sc = new Scanner(System.in);
                //guess = sc.nextLine();
                if (getEnterpressed() == 1) {
                    guess ="";
                    for(int i = NumberedActionListener.lower; i<NumberedActionListener.getCount(); i++){
                        guess += lab[i].getText();
                    }

                    enterpressed=0;
                    valid = isValid(guess, flwArray);
                    for(int i = lower; i<count; i++){
                        guess += lab[i].getText();
                    }
                }

            } while (!valid); //ends validation
            valid=false;
            checkWord(guess,"sasss",lab);
            guessesLeft--;
        } while (guessesLeft != 0);
        Color c = new Color(0xECC137);
    }

    public static boolean isValid(String a, String[] flw) {
        if (a.matches("[a-z]{5}")) { // checks if its 5 letters
            for (int i = 0; i < flw.length; i++) { //runs through list
                if (a.equals(flw[i])) { //checks ==
                    NumberedActionListener.setLower(NumberedActionListener.getLower() + 5);
                    NumberedActionListener.setUpper(NumberedActionListener.getUpper() + 5);
                    return true; //finds it
                }
            }
        }
        System.out.println("word is not valid");
        return false;
    }
    public static int[] preCheck(String guess,String randomword,int[] count){
        for (int j = 0; j < guess.length(); j++) {
            if (guess.charAt(j) == randomword.charAt(j)) {
                count[j] = 0;
            }
        }return count;
    }
    public static void checkWord(String guess,String randomword,JLabel[] labels){
        int[] count = new int[5];
        for(int i =0;i< count.length;i++){
            count[i]=1;
        }
        count = preCheck(guess,randomword,count);
        int greencount = 0;// is used to find 5 greens meaning the word is right
        for (int j = 0; j < guess.length(); j++) {//the loop for each character in my cuess compared to the answer
            if (guess.charAt(j) == randomword.charAt(j)) {//comparing the character at j in my guess  to the random word chosen
                labels[j+lower-5].setBackground(new Color(0x4CD22E));// prints the green character in GREEN  "" is used to turn the char to String for Syntax
                greencount++;// increase green count
            } else if(randomword.indexOf(guess.charAt(j)) != -1&&count[randomword.indexOf(guess.charAt(j))]!=0){// if the character at j is in the random word
                labels[j+lower-5].setBackground(new Color(0xDED801));
            }

        }
        if (greencount == 5) {
            System.out.println("you win");
        }
    }
}
class Word{
    private JLabel[] l;
    private String guess ="";
    Word(JLabel[] l){
        this.l = l;
        setWord();
    }
    Word(){

    }
    public String getWord(){
        return guess;
    }

    public void setWord() {
        for(int i = NumberedActionListener.lower; i<NumberedActionListener.getCount(); i++){
            guess += l[i].getText();
        }
    }
}