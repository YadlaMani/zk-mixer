import { Barretenberg, Fr } from "@aztec/bb.js";

async function hashLeftRight(left, right) {
  const bb = await Barretenberg.new();
  const frLeft = Fr.fromString(left);
  const frRight = Fr.fromString(right);
  const hash = await bb.poseidon2Hash([frLeft, frRight]);
  return hash.toString();
}

export class PoseidonTree {
  constructor(levels, zeros) {
    if (zeros.length < levels + 1) {
      throw new Error(
        "Not enough zero values provided for the given tree height."
      );
    }
    this.levels = levels;
    this.hashLeftRight = hashLeftRight;
    this.storage = new Map();
    this.zeros = zeros;
    this.totalLeaves = 0;
  }

  async init(defaultLeaves = []) {
    if (defaultLeaves.length > 0) {
      this.totalLeaves = defaultLeaves.length;

      defaultLeaves.forEach((leaf, index) => {
        this.storage.set(PoseidonTree.indexToKey(0, index), leaf);
      });

      for (let level = 1; level <= this.levels; level++) {
        const numNodes = Math.ceil(this.totalLeaves / 2 ** level);
        for (let i = 0; i < numNodes; i++) {
          const left =
            this.storage.get(PoseidonTree.indexToKey(level - 1, 2 * i)) ||
            this.zeros[level - 1];
          const right =
            this.storage.get(PoseidonTree.indexToKey(level - 1, 2 * i + 1)) ||
            this.zeros[level - 1];
          const node = await this.hashLeftRight(left, right);
          this.storage.set(PoseidonTree.indexToKey(level, i), node);
        }
      }
    }
  }

  static indexToKey(level, index) {
    return `${level}-${index}`;
  }

  getIndex(leaf) {
    for (const [key, value] of this.storage.entries()) {
      if (value === leaf && key.startsWith("0-")) {
        return parseInt(key.split("-")[1]);
      }
    }
    return -1;
  }

  root() {
    return (
      this.storage.get(PoseidonTree.indexToKey(this.levels, 0)) ||
      this.zeros[this.levels]
    );
  }

  proof(index) {
    const leaf = this.storage.get(PoseidonTree.indexToKey(0, index));
    if (!leaf) throw new Error("leaf not found");

    const pathElements = [];
    const pathIndices = [];

    this.traverse(index, (level, currentIndex, siblingIndex) => {
      const sibling =
        this.storage.get(PoseidonTree.indexToKey(level, siblingIndex)) ||
        this.zeros[level];
      pathElements.push(sibling);
      pathIndices.push(currentIndex % 2);
    });

    return {
      root: this.root(),
      pathElements,
      pathIndices,
      leaf,
    };
  }

  async insert(leaf) {
    const index = this.totalLeaves;
    await this.update(index, leaf, true);
    this.totalLeaves++;
  }

  async update(index, newLeaf, isInsert = false) {
    if (!isInsert && index >= this.totalLeaves) {
      throw Error("Use insert method for new elements.");
    } else if (isInsert && index < this.totalLeaves) {
      throw Error("Use update method for existing elements.");
    }

    const keyValueToStore = [];
    let currentElement = newLeaf;

    await this.traverseAsync(
      index,
      async (level, currentIndex, siblingIndex) => {
        const sibling =
          this.storage.get(PoseidonTree.indexToKey(level, siblingIndex)) ||
          this.zeros[level];
        const [left, right] =
          currentIndex % 2 === 0
            ? [currentElement, sibling]
            : [sibling, currentElement];
        keyValueToStore.push({
          key: PoseidonTree.indexToKey(level, currentIndex),
          value: currentElement,
        });
        currentElement = await this.hashLeftRight(left, right);
      }
    );

    keyValueToStore.push({
      key: PoseidonTree.indexToKey(this.levels, 0),
      value: currentElement,
    });
    keyValueToStore.forEach(({ key, value }) => this.storage.set(key, value));
  }

  traverse(index, fn) {
    let currentIndex = index;
    for (let level = 0; level < this.levels; level++) {
      const siblingIndex =
        currentIndex % 2 === 0 ? currentIndex + 1 : currentIndex - 1;
      fn(level, currentIndex, siblingIndex);
      currentIndex = Math.floor(currentIndex / 2);
    }
  }

  async traverseAsync(index, fn) {
    let currentIndex = index;
    for (let level = 0; level < this.levels; level++) {
      const siblingIndex =
        currentIndex % 2 === 0 ? currentIndex + 1 : currentIndex - 1;
      await fn(level, currentIndex, siblingIndex);
      currentIndex = Math.floor(currentIndex / 2);
    }
  }
}

const ZERO_VALUES = [
  "0x27f647825f3fe6ddc3141d33da09d0f23093ffb0c9147c638ed0d2d377d118e3",
  "0x1c623a46645d41e0ede64cc1544ad96782569a874387c09c192e285738a67718",
  "0x2bf976a7412de58c78d4f62d09890475e0af18ea01a9a329231db0618e357846",
  "0x097046819a47fc8416cf3397bdbf079a4e6580b2a8fbde91b8924684d897abbf",
  "0x0e822453eace0707a92724fb9ad7686de2199da692eb9ae72a1aa1f25e77b1b0",
  "0x211373b15a320ba5af8176e9ecddcb541cc33e74ff76b49b279fec67a8b6e1c3",
  "0x1805e7c7acfa6d7a82b43ea4002b54b82d6b4ebecf5261be6bd441dbeb28c60f",
  "0x17c835882f2a07dae9720ed25f931dd418d5c3d607db918f39eaaf9ac5952a2b",
  "0x282c630dc123d1144cff0291e62d4060a7e20948f832b0ae18e17ee1d7a83f84",
  "0x1a4e7289a3ebb66ee54bdc58b91ada49159ebdc84541ae132f592d53aa5d4ef6",
  "0x1c69d680289eaa0efb757112d2f9871f85780222f3a129cb744540e4922596c7",
  "0x0430fdc4fb8b4fe2d6be580b48b0b0bbe7741dd63b90e12ec7d8f538e6048244",
  "0x2877e54efecb5d45298b0cd179f27b25317830fe0ad0cfc48dead9a3ed9f3b97",
  "0x09a4dbddb4900bcaafef31ca97a03fe378aaedec5057d17acada8e5962587a76",
  "0x16555f9bfe0477fd45a74ef77a93423186961c8a813c124d0e7efbdaea60c71e",
  "0x0d187a26dc35c465f374c034ed53d97ad1a52f5b649815e2c459c85389cd47bd",
  "0x00ece7b77915555671177b28434d0115e25e94633194fcc151a8192ab509e030",
  "0x086718641b844e9df1f56643a652336666d976dafe3baf36595df1a1d5567781",
  "0x2f2a03994ebfb58dfb088b6dc6f74b8ee0d5dc47b763e67c087afee01ba03dce",
  "0x2cc7b14efc110dfeea62883d7295f8a8b38f5766127ddc8f3d5008bacb03a1d9",
  "0x2dbf0465e74fded06d6209c88f603a05c91ab302f3d1a4db0c73c95aa7f72a0b",
  "0x15f5f077f1054d05cbdd70acdd435e10938fec921d9d687f27a04d74b09b0c09",
  "0x0447768f2d5a8e0adc1fd8964f1beade0ae97b7c45d8e749083ba9f512cd0d99",
];

export async function merkleTree(leaves) {
  const TREE_HEIGHT = 20;
  const tree = new PoseidonTree(TREE_HEIGHT, ZERO_VALUES);

  // Initialize tree with no leaves (all zeros)
  await tree.init();

  // Insert some leaves (from input)
  for (const leaf of leaves) {
    await tree.insert(leaf);
  }

  return tree;
}
