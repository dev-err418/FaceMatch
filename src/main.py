import os
from sys import argv, exit
import face_recognition
import cv2
from math import floor
from os import system
from plyer import notification

chemins_des_visages_connus = []
chemins_des_visages_inconnus = []

visage_connus = []

nom = argv[1]

tolerance = 0.6
epaisseur_fenetre = 3 * 10
epaisseur_police = 2 * 3
modele = 'hog'

def changerLaTailleEnGardantLechelle(image, width=None, height=None, inter=cv2.INTER_AREA):
    dim = None
    (h, w) = image.shape[:2]
    if width is None and height is None:
        return image
    if width is None:
        r = height / float(h)
        dim = (int(w * r), height)
    else:
        r = width / float(w)
        dim = (width / int(h * r))

    return cv2.resize(image, dim, interpolation=inter)



def reformatageValeurs():
    separationBool = True
    for x in range(len(argv) - 2):
        idx = argv[x + 2]
        if (separationBool):
            if (idx == "SEPARATION"):
                separationBool = False
            else:
                chemins_des_visages_connus.append(idx)
        else:
            chemins_des_visages_inconnus.append(idx)
    trouverVisages()


def trouverVisages():

    for chemin in chemins_des_visages_connus:
        image = face_recognition.load_image_file(chemin)
        encoding = face_recognition.face_encodings(image)[0]
        visage_connus.append(encoding)

    for chemin in chemins_des_visages_inconnus:
        image = face_recognition.load_image_file(chemin)
        locations = face_recognition.face_locations(image, model=modele)
        encodings = face_recognition.face_encodings(image, locations)
        image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
        trouve = False

        print(' Dans', chemin, len(encodings), 'visage(s) trouvé(s)')

        for face_encoding, face_location in zip(encodings, locations):
            resultats = face_recognition.compare_faces(visage_connus, face_encoding, tolerance)
            #match = None

            if True in resultats: 
                #match = name
                print(f' - {nom} trouvé(e) dans {chemin}')
                haut_gauche = (face_location[3], face_location[0])
                bas_droite = (face_location[1], face_location[2])
                couleur = [255, 0, 0]
                cv2.rectangle(image, haut_gauche, bas_droite, couleur, epaisseur_fenetre)
                haut_gauche = (face_location[3] - floor(epaisseur_fenetre / 2), face_location[2])
                bas_droite = (face_location[1] + floor(epaisseur_fenetre / 2), face_location[2] + 80)
                image == cv2.rectangle(image, haut_gauche, bas_droite, couleur, cv2.FILLED)
                cv2.putText(image, nom, (face_location[3] + 10 * 3, face_location[2] + 15 * 3), cv2.FONT_HERSHEY_SIMPLEX, 0.5 * 4, (255, 255, 255), epaisseur_police)
                trouve = True

        if trouve:    
            imModifie = changerLaTailleEnGardantLechelle(image, height=800)
            cv2.imshow(chemin, imModifie)
            cv2.waitKey(0)
            #cv2.destroyWindow(filename)

            # if 0xFF == ord("q"):
            #     print("closed")
            #     break


if __name__ == '__main__':
    reformatageValeurs()
