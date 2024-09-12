import shutil

class ResetService:
    def __init__(self, reset_file_path='data/hypotheses_original.json', hypothesis_file_path='data/hypotheses.json'):
        self.reset_file_path = reset_file_path
        self.hypothesis_file_path = hypothesis_file_path

    def execute(self):
        shutil.copy(self.reset_file_path, self.hypothesis_file_path)