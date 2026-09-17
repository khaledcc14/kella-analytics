class MatchModel {
  final int id;
  final String homeTeam;
  final String awayTeam;
  final String status;
  final String utcDate;
  final int? homeScore;
  final int? awayScore;

  MatchModel({
    required this.id,
    required this.homeTeam,
    required this.awayTeam,
    required this.status,
    required this.utcDate,
    this.homeScore,
    this.awayScore,
  });

  factory MatchModel.fromJson(Map<String, dynamic> json) {
    return MatchModel(
      id: json['id'] ?? 0,
      homeTeam: json['homeTeam'] != null ? json['homeTeam']['name'] ?? 'غير معروف' : 'غير معروف',
      awayTeam: json['awayTeam'] != null ? json['awayTeam']['name'] ?? 'غير معروف' : 'غير معروف',
      status: json['status'] ?? 'SCHEDULED',
      utcDate: json['utcDate'] ?? '',
      homeScore: json['score']?['fullTime']?['home'],
      awayScore: json['score']?['fullTime']?['away'],
    );
  }
}

