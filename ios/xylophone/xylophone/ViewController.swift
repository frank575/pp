//
//  ViewController.swift
//  xylophone
//
//  Created by 吳俊緯 on 2022/1/11.
//
//

import UIKit
import AVFoundation


class ViewController: UIViewController {

    var player: AVAudioPlayer!

    override func viewDidLoad() {
    super.viewDidLoad()
    // Do any additional setup after loading the view.
    }

    @IBAction func pressButton(_ sender: UIButton) {
        playSound(resourceName: sender.titleLabel!.text!)
    }
    
    func playSound(resourceName: String) {
        let url = Bundle.main.url(forResource: resourceName, withExtension: "wav")
        player = try! AVAudioPlayer(contentsOf: url!)
        player.play()
    }

}
