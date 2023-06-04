package com.ethan.pan;

import java.io.InputStream;
import java.util.List;

import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

public class XmlTest {
    public static void main(String[] args) throws Exception {
        SAXReader saxReader = new SAXReader();
        InputStream is = XmlTest.class.getClassLoader().getResourceAsStream("user.xml");
        Document document = saxReader.read(is);
        Element root = document.getRootElement();
        // System.out.println(root);
        List<Element> subEleList = root.elements();
        // System.out.println("subEleList.size() = " + subEleList.size());
        for (Element ele : subEleList) {
            String id = ele.attributeValue("id");
            System.out.println("id = " + id);
            Element idEle = ele.element("id");
            Element nameEle = ele.element("name");
            System.out.println("idEle = " + idEle.getText());
            System.out.println("nameEle = " + nameEle.getText());
            User user = new User(idEle.getText(), nameEle.getText());
        }
    }

    static class User {

        private String id;
        private String name;

        public User() {
        }

        public User(String id, String name) {
            this.id = id;
            this.name = name;
        }

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

    }
}
