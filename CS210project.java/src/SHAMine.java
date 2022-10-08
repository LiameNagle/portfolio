
import java.security.*;
import java.io.*;

public class SHAMine {
    public static void main(String [] args){
    Dictionary war = new Dictionary();//i have used the replace function and regex inn intellij to find only sentences whit 10 or less words

    int highscore = 0;// holds high score
    int hsi = 0;//holds highscore of first setance
    int hsj =0;//^^ but second
    for(int i =0;i< war.getSize();i++){// creats i as a counter uses war.get() which retursn the amount of lines in the txtfile
    String x = sha256(war.getWord(i));// holds sha of 0+1 *** will get compared to every other sentace in the txt file via inner loop
        for(int j = i+1 ; j < war.getSize();j++) {// creats j runs through every sentance past i  (otherwise its allready been compared
            String y = sha256(war.getWord(j)); // stores the sha for j
            int newscore = shacompare(x, y); // stores the score temparaly of the compared SHAs
            if (newscore > highscore&& newscore!=64) {// check if its bigger then the high score or is exatly the same as the sentace "why?" could show up often
                highscore = newscore;// sets new high score if true
               hsi = i;//records highscore location
               hsj =j;// ^


            }

        }
    }
    System.out.println(highscore+"\n"+war.getWord(hsj)+"\n"+war.getWord(hsi)+"\n"+sha256(war.getWord(hsj))+"\n"+sha256(war.getWord(hsi)));// score sentace 1 sentace 2  sah 1 sha 2



    }
    public static int shacompare(String x , String y){
            int score =0;// records score
            for(int i = 0;i<x.length();i++) {
                if(x.charAt(i) == y.charAt(i)){// for every charature that matches increase the score by 1
                    score++;
            }
        }
            return score;
    }
    public static String sha256(String input) {
        try {
            MessageDigest mDigest = MessageDigest.getInstance("SHA-256");
            byte[] salt = "CS210+".getBytes("UTF-8");
            mDigest.update(salt);
            byte[] data = mDigest.digest(input.getBytes("UTF-8"));
            StringBuffer sb = new StringBuffer();
            for (int i = 0; i < data.length; i++) {
                sb.append(Integer.toString((data[i] & 0xff) + 0x100, 16).substring(1));
            }
            return sb.toString();
        } catch (Exception e) {
            return (e.toString());
        }
    }
}


class Dictionary{

    private String input[];

    public Dictionary(){
        input = load("C://books(4).txt");
    }

    public int getSize(){
        return input.length;
    }

    public String getWord(int n){
        return input[n];
    }

    private String[] load(String file) {
        File aFile = new File(file);
        StringBuffer contents = new StringBuffer();
        BufferedReader input = null;
        try {
            input = new BufferedReader( new FileReader(aFile) );
            String line = null;
            int i = 0;
            while (( line = input.readLine()) != null){
                contents.append(line);
                i++;
                contents.append(System.getProperty("line.separator"));
            }
        }catch (FileNotFoundException ex){
            System.out.println("Can't find the file - are you sure the file is in this location: "+file);
            ex.printStackTrace();
        }catch (IOException ex){
            System.out.println("Input output exception while processing file");
            ex.printStackTrace();
        }finally{
            try {
                if (input!= null) {
                    input.close();
                }
            }catch (IOException ex){
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
        for(String s: array){
            s.trim();
        }
        return array;
    }
}