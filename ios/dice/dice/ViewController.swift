//
//  ViewController.swift
//  dice
//
//  Created by 吳俊緯 on 2022/1/11.
//
//

import UIKit


class ViewController: UIViewController {

    @IBOutlet weak var diceImageViewOne: UIImageView!
    @IBOutlet weak var diceImageViewTwo: UIImageView!
    var leftDiceNumber = 0
    var rightDiceNumber = 0
    var diceImages = [UIImage(named: "DiceOne"), UIImage(named: "DiceTwo"), UIImage(named: "DiceThree"), UIImage(named: "DiceFour"),UIImage(named: "DiceFive"),UIImage(named: "DiceSix")]

    override func viewDidLoad() {
        super.viewDidLoad()
    }

    @IBAction func rollButtonPressed(_ sender: UIButton) {
        leftDiceNumber = Int.random(in: 0...5)
        rightDiceNumber = Int.random(in: 0...5)
        diceImageViewOne.image = diceImages[leftDiceNumber]
        diceImageViewTwo.image = diceImages[rightDiceNumber]
    }
}
